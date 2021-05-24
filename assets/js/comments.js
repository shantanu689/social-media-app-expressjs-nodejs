{
  // method to submit the form data for the post using ajax
  let createComment = () => {
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

          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let newPostDOM = (post) => {
    return $(`<li id="post-${post._id}">
        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}"> X </a>
                </small>
  
                     ${post.content}
                        <br />
                        <small>
                            ${post.user.name}
                        </small>
        </>
        <div class="post-comments">
  
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to comment..." required />
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" value="Add comment" />
                </form>
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        
                        </ul>
                    </div>
        </div>
    </li>`);
  };

  // method to delete a post
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

  createComment();
}
