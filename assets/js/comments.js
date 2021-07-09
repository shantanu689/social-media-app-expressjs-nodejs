class Comment {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${this.postId}`);
    // this.addCommentFormButton = $(`#add-comment-button-${this.postId}`);
    // this.deleteCommentLink = this.addCommentForm(this.addCommentFormButton);
    // this.commentsCount = $(`#comments-count-${this.postId}`);
    // MINE
    this.trackCommentSubmit = this.trackComment();
    let self = this;
    // $(" .delete-comment-button", this.postContainer).each(function () {
    //   self.deleteComment(this);
    // });
  }

  // createComment() {
  //   let pSelf = this;

  //   let commentForm = $(`#form-${this.postId}`);
  //   commentForm.submit(function (e) {
  //     e.preventDefault();
  //     let self = this;

  //     $.ajax({
  //       type: "POST",
  //       url: "/comments/create",
  //       data: $(self).serialize(),
  //       success: (data) => {
  //         let newComment = pSelf.newCommentDom(data.data.comment);
  //         $(`#comment-container-${pSelf.postId}`).prepend(newComment);
  //         pSelf.deleteComment($(" .delete-comment-button", newComment));

  //         new Noty({
  //           theme: 'relax',
  //           text: "Comment Created!",
  //           type: 'success',
  //           layout: 'topRight',
  //           timeout: 1500
            
  //       }).show();

  //         let comments = $(pSelf.commentsCount).attr("data-comment");
  //         comments = parseInt(comments) + 1;
  //         pSelf.commentsCount.empty();
  //         pSelf.commentsCount.attr("data-comment", comments);
  //         pSelf.commentsCount.append(comments);
  //       },
  //       error: (err) => {},
  //     });
  //   });
  // }

  // addCommentForm(addCommentForm) {
  //   // let self = this;
  //   // addCommentForm.click(function (e) {
  //   //   e.preventDefault();
  //   //   let commentFormContainer = $(
  //   //     `#comment-form-container-${$(this).prop("value")}`
  //   //   );
  //   //   commentFormContainer.prepend(
  //   //     self.commentFormDom(addCommentForm.prop("value"))
  //   //   );
  //   //   $(this).remove();
  //   //   self.createComment();
  //   //   self.deleteComment();
  //   // });
  //   self.createComment();
  // }

  trackComment() { 
    // tracking comment
    let pSelf = this;
    console.log(this.postId)
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

          // let comments = $(pSelf.commentsCount).attr("data-comment");
          // comments = parseInt(comments) + 1;
          // pSelf.commentsCount.empty();
          // pSelf.commentsCount.attr("data-comment", comments);
          // pSelf.commentsCount.append(comments);
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

          // let comments = $(pSelf.commentsCount).attr("data-comment");
          // comments = parseInt(comments) - 1;
          // pSelf.commentsCount.empty();
          // pSelf.commentsCount.attr("data-comment", comments);
          // pSelf.commentsCount.append(comments);
        },
        error: function (error) {},
      });
    });
  }

  // commentFormDom(id) {
  //   return $(`
  //     <form id='form-${id}' class="new-comment-form d-flex justify-content-between align-items-center" action="/comments/create" method="POST" style="width: 100%;">
  //                 <input type="hidden" value="${id}" name="post">
  //                 <textarea placeholder="Comment..."
  //                     style=" outline: none;resize: none;background-color: #f0f2f5; border-radius: 40px; padding: 2%;"
  //                     class="col-auto" name="comment" cols="30" rows="1"></textarea>
  //                 <button class="make-comment" type="submit"> 
  //                     <i class="far fa-comment-alt"></i>
  //                 </button>
  //             </form>
  //     `);
  // }

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
