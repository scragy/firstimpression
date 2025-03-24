document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("questionnaire").addEventListener("submit", function (event) {
        event.preventDefault();

        let selectedOption = document.querySelector('input[name="impression"]:checked');
        let reason = document.getElementById("reason").value.trim();
        let responseMessage = document.getElementById("responseMessage");
        let form = document.getElementById("questionnaire");
        let thankYouMessage = document.getElementById("thankYouMessage");

        // Cari elemen pertanyaan
        let questionTitle = document.getElementById("questionTitle");
        let questionSubtitle = document.getElementById("questionSubtitle");

        if (!selectedOption) {
            alert("Please select an option before submitting!");
            return;
        }
        if (reason === "") {
            alert("Please tell us why you chose this option!");
            return;
        }

        let formData = {
            impression: selectedOption.value,
            reason: reason
        };

        fetch("https://script.google.com/macros/s/AKfycbx93ijUpPa18GigZkAmb8T8v2M8K5v9H-uMxq22jvP7ery5PjZ67vgG-n8ZHR8SH5QM/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            console.log("Data sent successfully!");
            
            // Sembunyikan form dan pertanyaan
            form.style.display = "none";
            if (questionTitle) questionTitle.style.display = "none";
            if (questionSubtitle) questionSubtitle.style.display = "none";

            // Tampilkan pesan terima kasih
            thankYouMessage.style.display = "block";
            thankYouMessage.style.opacity = "1";
        })
        .catch(error => console.error("Error:", error));
    });
});