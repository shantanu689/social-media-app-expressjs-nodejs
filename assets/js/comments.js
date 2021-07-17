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
      $.ajax({
        type: "POST",
        url: "/comments/create",
        data: $(self).serialize(),
        success: (data) => {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#comment-container-${pSelf.postId} .list-comments`).append(
            newComment
          );
          pSelf.deleteComment($(" .delete-comment-button", newComment));
          $(`#comments-count-${pSelf.postId}`).html(`${data.data.length}`);
          new Noty({
            theme: "relax",
            text: "Comment Created!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
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
          $(`#comments-count-${pSelf.postId}`).html(`${data.data.length}`);
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
    let imagePath;
    if(comment.user.avatar.includes('http')) {
      imagePath = comment.user.avatar
    } else {
      imagePath = `/images/${comment.user.avatar}`
    }
    return $(`<div
    id="comment-${comment._id}"
    class="d-flex align-items-start"
    style="margin-bottom: 3%"
  >
    <img
      src="${imagePath}"
      width="40"
      height="40"
      style="border-radius: 50%"
    />
    <div class="all-comments-container">
      <div class="comments-title">
        <span style="font-weight: 600">${comment.user.name}</span>
        <a
          class="delete-comment-button"
          style="color: blue; padding-top: 5px"
          href="/comments/destroy/${comment._id}"
        >
          <i class="fas fa-trash-alt" aria></i>
        </a>
      </div>
      <span>${comment.content}</span>
    </div>
  </div>
  `);
  }
}
