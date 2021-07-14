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
            if (data.data.deleted) {
              $(`#likes-count-${postId}`).html(`${data.data.likes}`)
              $(likeButton[i]).removeClass("liked")
              $(likeButton[i]).addClass("not-liked")
            } else {
              $(`#likes-count-${postId}`).html(`${data.data.likes}`)
              $(likeButton[i]).removeClass("not-liked")
              $(likeButton[i]).addClass("liked")
            }
          },
        });
      });
    }
  };
  attachLike();
}
