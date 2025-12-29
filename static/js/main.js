// Prevent multiple form submissions
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", function () {
    const btn = form.querySelector("button");
    if (btn) btn.disabled = true;
  });
});

// Basic input sanitization
document.querySelectorAll("input, textarea").forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[<>]/g, "");
  });
});
