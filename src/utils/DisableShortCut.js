import $ from 'jquery';
export const disableShortCuts = () => {
  // For browser refresh button
  window.onbeforeunload = function () {
    return 'Data will be lost if you leave the page, are you sure?';
  };

  // For right click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  var ctrlKeyDown = false;

  $(document).ready(function () {
    $(document).on('keydown', keydown);
    $(document).on('keyup', keyup);
  });

  function keydown(e) {
    if (
      (e.which || e.keyCode) == 116 ||
      ((e.which || e.keyCode) == 82 && ctrlKeyDown)
    ) {
      // Pressing F5 or Ctrl+R
      e.preventDefault();
    } else if ((e.which || e.keyCode) == 17) {
      // Pressing  only Ctrl
      ctrlKeyDown = true;
    }
  }

  function keyup(e) {
    // Key up Ctrl
    if ((e.which || e.keyCode) == 17) ctrlKeyDown = false;
  }

  window.oncontextmenu = function () {
    return false;
  };
  $(document).keydown(function (event) {
    if (event.keyCode == 123) {
      return false;
    } else if (
      (event.ctrlKey && event.shiftKey && event.keyCode == 73) ||
      (event.ctrlKey && event.shiftKey && event.keyCode == 74)
    ) {
      return false;
    }
  });
};
