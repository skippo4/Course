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
    form.addEventListener("submit", async function (e) {
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

      // Show spinner and update button text
      const btnText = document.querySelector(".btn-text");
      const spinner = document.querySelector(".spinner");
      if (btnText) btnText.textContent = "Processing...";
      if (spinner) spinner.style.display = "inline-block";

      const amount = coursePrices[course];

      const handler = PaystackPop.setup({
        key: 'pk_live_8b3974a1d8163244030bb3b2735556203fed3e81', // Replace with your actual public key
        email: email,
        amount: amount,
        currency: "NGN",
        ref: "XYLEM_" + Math.floor(Math.random() * 1000000000),
        metadata: {
          custom_fields: [
            { display_name: "Full Name", variable_name: "fullname", value: fullname },
            { display_name: "Phone", variable_name: "phone", value: phone },
            { display_name: "Course", variable_name: "course", value: course },
            { display_name: "Level", variable_name: "level", value: level }
          ]
        },
        callback: async function (response) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxWMLcotN-eixAk-DbCTdG01WSp1w7caEPZcaQs4N_SEhdf5i2Dtf2EnVs3nvLsQDMp/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        phone,
        course,
        level,
        reference: response.reference
      })
    });

    if (!res.ok) throw new Error("Failed to save data");

    // ✅ Only redirect if the request is successful
    window.location.href = `https://chat.whatsapp.com/Gx1awJ1J8tc7j8pndZpvBl`;

  } catch (err) {
    alert("Payment was successful, but we couldn't save your data. Please contact support.");
  } finally {
    // Optional: reset button state
    if (btnText) btnText.textContent = "Apply & Pay";
    if (spinner) spinner.style.display = "none";
  }
});

    if (!res.ok) throw new Error("Failed to save data");

    // ✅ Only redirect if the request is successful
    window.location.href = `https://chat.whatsapp.com/Gx1awJ1J8tc7j8pndZpvBl`;

  } catch (err) {
    alert("Payment was successful, but we couldn't save your data. Please contact support.");
  } finally {
    // Optional: reset button state
    if (btnText) btnText.textContent = "Apply & Pay";
    if (spinner) spinner.style.display = "none";
  }
});
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

