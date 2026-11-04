// Queue follows FIFO: First In, First Out.
class Queue {
  constructor() {
    this.items = [];
  }

  // Add a new value at the rear of the queue.
  enqueue(element) {
    this.items.push(element);
    return element;
  }

  // Remove and return the value at the front of the queue.
  dequeue() {
    if (this.isEmpty()) return undefined;
    return this.items.shift();
  }

  // Return the front value without removing it.
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  print() {
    return [...this.items];
  }
}

$(document).ready(function () {
  const queue = new Queue();

  function showMessage(message, type = "info") {
    const colors = {
      info: "text-primary",
      success: "text-success",
      warning: "text-danger"
    };
    $("#message")
      .removeClass("text-primary text-success text-danger")
      .addClass(colors[type])
      .text(message);
  }

  function renderQueue() {
    const $display = $("#queue");
    $display.empty();

    if (queue.isEmpty()) {
      $display.html('<p class="text-center text-white-50 empty-label">Queue is empty</p>');
      return;
    }

    queue.print().forEach(function (value, index) {
      const position = index === 0 ? "front-item" : "";
      const $item = $("<div>")
        .addClass("queue-item")
        .addClass(position)
        .text(value);

      if (index === 0) {
        $item.attr("title", "Front of queue");
      }
      $display.append($item);
    });
  }

  function renderDeletedEmptyState() {
    if ($("#dequeued .deleted-item").length === 0) {
      $("#dequeued").html('<p class="text-center text-dark empty-label">No deleted items</p>');
    }
  }

  $("#btn_enqueue").on("click", function () {
    const value = $("#queue_data").val().trim();

    if (value === "") {
      showMessage("Please enter a value before enqueueing.", "warning");
      $("#queue_data").trigger("focus");
      return;
    }

    queue.enqueue(value);
    $("#queue_data").val("");
    renderQueue();
    showMessage(value + " was added to the rear of the queue.", "success");
  });

  $("#queue_data").on("keydown", function (event) {
    if (event.key === "Enter") {
      $("#btn_enqueue").trigger("click");
    }
  });

  $("#btn_dequeue").on("click", function () {
    if (queue.isEmpty()) {
      showMessage("Cannot dequeue: the queue is empty.", "warning");
      return;
    }

    const removed = queue.dequeue();
    $("#dequeued .empty-label").remove();

    $("<div>")
      .addClass("deleted-item")
      .text(removed)
      .prependTo("#dequeued");

    renderQueue();
    showMessage(removed + " was removed from the front of the queue.", "success");
  });

  $("#btn_peek").on("click", function () {
    if (queue.isEmpty()) {
      showMessage("Cannot peek: the queue is empty.", "warning");
      return;
    }

    const frontValue = queue.peek();
    renderQueue();
    $(".front-item").addClass("peek-highlight");

    showMessage("Front value: " + frontValue + " (not removed).", "success");

    setTimeout(function () {
      $(".front-item").removeClass("peek-highlight");
    }, 500);
  });

  $("#btn_clear").on("click", function () {
    queue.clear();
    $("#dequeued").empty().html('<p class="text-center text-dark empty-label">No deleted items</p>');
    renderQueue();
    showMessage("Queue and deleted display have been cleared.", "info");
  });

  renderQueue();
});
