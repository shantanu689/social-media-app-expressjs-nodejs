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
          let newPost = newPostDOM(data.data.post);

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();

          $(".posts-list-container").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let newPostDOM = (post) => {
    return $(`<div id="post-${post._id}" class="card">
    <div class="post-header d-flex justify-content-between">
        <div class="post-username">
            ${post.user.name}
        </div>
        <div>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">
                    <i class="fas fa-trash-alt blue-color" aria></i>
                </a>
        </div>
    </div>
    <span class="text-muted mb-2" style="margin-left: 50px;">
        now
    </span>
    <div class="post-content card-body bg-light">
        ${post.content}
    </div>
    <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to comment..." required />
                <input type="hidden" name="post" value="${post._id}" />
                <!-- Above line very imp check -->
                <input type="submit" value="Add comment" />
            </form>
    </div>
</div>`);
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

  createPost();
}
