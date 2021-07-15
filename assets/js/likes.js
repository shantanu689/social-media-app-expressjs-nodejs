{
  const attachLike = () => {
    let likeButton = $(".like-comment-bottom>.like");
    for (let i = 0; i < likeButton.length; i++) {
      $(likeButton[i]).click((event) => {
        event.preventDefault();
        let postId = $(likeButton[i]).attr("id").split("-")[1];
        $.ajax({
          type: "GET",
          url: `/likes/toggle/${postId}`,
          success: (data) => {
            let user = data.data.user
            $(`#likes-count-${postId}`).html(`${data.data.likes}`);
            if (data.data.deleted) {
              $(likeButton[i]).removeClass("liked");
              $(likeButton[i]).addClass("not-liked");
              $(`#post-modal-${postId} #${user._id}`).remove()
            } else {
              $(likeButton[i]).removeClass("not-liked");
              $(likeButton[i]).addClass("liked");
              $(`#post-modal-${postId} .display-like-user`).append(`
              <a
              id="${user._id}"
              href="/users/profile/${user._id}"
              style="text-decoration: none"
            >
              <div
                style="width: 100%"
                class="d-flex justify-content-between mb-3 like-user-card"
              >
                <img
                  src="${user.avatar}"
                  alt="${user.name}"
                  width="35"
                  height="35"
                  style="border-radius: 100px"
                />
                <h6>${user.name}</h6>
              </div>
            </a>
              `)
            }
          },
        });
      });
    }
  };
  attachLike();
}
