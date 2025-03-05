export default function validateForm(data) {
    const errors = [ ];
        // Validate first name
        if (!data.fname || data.fname.trim() === "") {
            errors.push("First name is required");
        }
    
        // Validate last name
        if (!data.lname || data.lname.trim() === "") {
            errors.push("Last name is required");
        }

        if (!data.lname || data.lname.trim() === "") {
            errors.push("Last name is required");
        }

        if (data.location == "default") {
            errors.push("Please Select location of where we met");
        } else {
            const validOptions = [ "online", "irl","event","friend",];
            if (!validOptions.includes(data.location)) {
                errors.push("Find a Job!");
            }
        }

        if (data.mailing) {
            const validOptions = [ "mail",];
            if (!validOptions.includes(data.mailing)) {
                errors.push("Try out indeed.com!");
            }
        } 
    
        if (data.format) {
            const validOptions = [ "html","text"];
            if (!validOptions.includes(data.format)) {
                errors.push("Become a contributing member of society!");
            }
        }  


        return{
            isValid: errors.length === 0,
            errors
        }
}