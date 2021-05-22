{
  let current = "W";
  $(".text-enter").html("W");
  let textEnter = "Welcome to the hex!";
  let length = textEnter.length;
  let i = 1;
  let interval = setInterval(() => {
    current = current + textEnter[i];
    $(".text-enter").html(current);
    i = i + 1;
    if (i == length) {
      clearInterval(interval);
    }
  }, 80);
}
