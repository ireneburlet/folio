(function() {
    // Set up an event listener for the contact form.
    $('#ajax-contact').on('submit',function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // Get the form.
        var form = $('#ajax-contact');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Serialize the form data.
        var formData = $(form).serialize();
        console.log(formData);

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
            success: function() {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
    
                // Set the message text.
                $(formMessages).text("Message send");
    
                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            },
            error: function() {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
    
                // Set the message text.
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
}());