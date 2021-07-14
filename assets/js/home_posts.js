{
  // method to submit the form data for the post using ajax
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDOM(data.data.post, data.data.time);

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();

          $(".posts-list-container").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          let postId = $(newPost).attr("id").split("-")[1];
          // let self = $(newPost);
          // const postId = self.attr("id").split("-")[1];
          // console.log(postId)
          let element = $(` .post-comments`, newPost);
          $(` .comment-count`, newPost).click((event) => {
            $(element).removeClass("post-comments");
            $(element).addClass("show-post-comments");
          });
          $(` .comment`, newPost).click((event) => {
            $(element).removeClass("post-comments");
            $(element).addClass("show-post-comments");
          });
          new Comment(postId);

          let element2 = $(" .like", newPost)
          $(element2).click((event) => {
            event.preventDefault();
            $.ajax({
              type: "GET",
              url: `/likes/toggle/${postId}`,
              success: (data) => {
                if (data.data.deleted) {
                  $(`#likes-count-${postId}`).html(`${data.data.likes}`)
                  $(element2).removeClass("liked")
                  $(element2).addClass("not-liked")
                } else {
                  $(`#likes-count-${postId}`).html(`${data.data.likes}`)
                  $(element2).removeClass("not-liked")
                  $(element2).addClass("liked")
                }
              },
            });
          })

        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let newPostDOM = (post, time) => {
    return $(`<div id="post-${post._id}" class="card">
    <div class="post-header d-flex justify-content-between">
      <div class="post-username">
        <img
          src="${post.user.avatar}"
          width="50"
          height="50"
          style="border-radius: 50%"
        />
        ${post.user.name}
      </div>
      <div>
        <a class="delete-post-button" href="/posts/destroy/${post._id}">
          <i class="fas fa-trash-alt blue-color" aria></i>
        </a>
      </div>
    </div>
    <span class="text-muted mb-2" style="margin-left: 50px">
      ${time}
    </span>
    <div class="post-content card-body bg-light">${post.content}</div>
    <div class="d-flex justify-content-between px-5 mt-4 pb-1 mb-2">
      <div>
        <span id="likes-count-${post._id}"> ${post.likes.length} </span>
        <i class="far fa-thumbs-up" style="color: blue"></i>
      </div>
      <div class="comment-count">
        <span id="comments-count-${post._id}">
          ${post.comments.length}
        </span>
        comments
      </div>
    </div>
    <div class="like-comment-bottom">
      <div class="like not-liked" id="like-${post._id}">
        <i class="far fa-thumbs-up"></i>
        Like
      </div>
      <div class="comment">
        <i class="far fa-comment-alt"></i>
        Comment
      </div>
    </div>
    <div class="post-comments">
      <div id="comment-container-${post._id}">
        <div class="list-comments">
        </div>
        <form
          id="new-comment-form-${post._id}"
          action="/comments/create"
          method="POST"
        >
          <div class="d-flex justify-content-start align-items-top">
            <img
              src="${post.user.avatar}"
              width="50"
              height="50"
              style="border-radius: 50%; margin-right: 4%"
            />
            <textarea
              name="content"
              cols="40"
              rows="1"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <input type="hidden" name="post" value="${post._id}" />
          <!-- Above line very imp check -->
          <button
            type="submit"
            class="btn-primary"
            style="border-radius: 10px; padding: 1%; margin-left: 70%"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  </div>
  `);
  };

  let deletePost = (deleteLink) => {
    $(deleteLink).click((e) => {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: (data) => {
          new Noty({
            theme: "relax",
            text: "Post deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();

          $(`#post-${data.data.post_id}`).remove();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let homepageLoad = () => {
    let posts = $(".posts-list-container>div");
    for (post of posts) {
      let self = $(post);
      const postId = self.attr("id").split("-")[1];
      // console.log(postId)
      let element = $(` .post-comments`, post);
      $(` .comment-count`, post).click((event) => {
        $(element).removeClass("post-comments");
        $(element).addClass("show-post-comments");
      });
      $(` .comment`, post).click((event) => {
        $(element).removeClass("post-comments");
        $(element).addClass("show-post-comments");
      });
      new Comment(postId);
      deletePost($(" .delete-post-button", post));
    }
  };

  createPost();
  homepageLoad();
}
