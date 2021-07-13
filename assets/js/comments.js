class Comment {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${this.postId}`);
    this.trackCommentSubmit = this.trackComment();
    let self = this;
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment(this);
    });
  }

  trackComment() { 
    // tracking comment
    let pSelf = this;
    // console.log(this.postId)
    let commentForm = $(`#new-comment-form-${this.postId}`);
    commentForm.submit(function (e) {
      e.preventDefault();
      let self = this;
      console.log('inside')
      $.ajax({
        type: "POST",
        url: "/comments/create",
        data: $(self).serialize(),
        success: (data) => {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#comment-container-${pSelf.postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));

          new Noty({
            theme: 'relax',
            text: "Comment Created!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
        },
        error: (err) => {},
      });
    });
  }

  deleteComment(deleteLink) {
    let pSelf = this;
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {},
      });
    });
  }

  newCommentDom(comment) {
    return $(`<div id='comment-${comment._id}'>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}"> X </a>
             ${comment.content}
            <small>
            ${comment.user.name}
            </small>
            </div>`)
  }
}
