document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Contact form alert
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you, ' + contactForm.name.value + '! We received your message.');
      contactForm.reset();
    });
  }

  // Animate hero section
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  let current = 0;
  function showNextTestimonial() {
    testimonials[current].classList.remove('active');
    current = (current + 1) % testimonials.length;
    testimonials[current].classList.add('active');
  }
  if (testimonials.length > 0) {
    testimonials[0].classList.add('active');
    setInterval(showNextTestimonial, 5000);
  }

  // Apply & Pay Form
  const form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const course = document.getElementById("course").value;
      const level = document.getElementById("level").value;

      const coursePrices = {
        excel: 10000,
        powerbi: 150000,
        python: 200000
      };

      if (!fullname || !email || !phone || !course || !level) {
        alert("Please fill all fields.");
        return;
      }

      const btnText = document.querySelector(".btn-text");
      const spinner = document.querySelector(".spinner");
      if (btnText) btnText.textContent = "Processing...";
      if (spinner) spinner.style.display = "inline-block";

      const amount = coursePrices[course];

      const handler = PaystackPop.setup({
  key: 'pk_test_5b46993ec51dbdb81b8685677d267223a8e97420',
  email: email,
  amount: amount,
  currency: "NGN",
  ref: "XYLEM_" + Math.floor(Math.random() * 1000000000),
  metadata: {
    full_name: fullname,
    phone: phone,
    course: course,
    level: level
  },
  callback: function (response) {
    (async () => {
      const studentData = {
        fullname,
        email,
        phone,
        course,
        level,
        reference: response.reference
      };

      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyji0c5eriKlcSMIE3zKw90_xCh_4Oko4bdkrhOalKHoMoPJsuSALw862QpzYmHlmFc7g/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData)
        });

        if (!res.ok) {
          throw new Error("Google Script error: " + res.status);
        }

        alert("Payment successful and data saved!");
      } catch (err) {
        console.error("Failed to save to Google Sheets:", err);
        alert("Payment succeeded but saving failed.");
      } finally {
        if (btnText) btnText.textContent = "Apply & Pay";
        if (spinner) spinner.style.display = "none";
        window.location.href = "https://chat.whatsapp.com/Gx1awJ1J8tc7j8pndZpvBl";
      }
    })();
  },
  onClose: function () {
    alert("Payment was cancelled.");
    if (btnText) btnText.textContent = "Apply & Pay";
    if (spinner) spinner.style.display = "none";
  }
});
handler.openIframe();
    });
  }
});