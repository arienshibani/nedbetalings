module.exports = {
    incrementDate: (dateString, whatToIncrement = "date") => {
        //Split dateString
        var splitDate = dateString.split("-");

        //Construct date object
        var dt = new Date(
            parseInt(splitDate[0], 10), // year
            parseInt(splitDate[1], 10 - 1), // month (starts with 0)
            parseInt(splitDate[2], 10) // date
        );

        if (whatToIncrement === "date") {
            dt.setDate(dt.getDate() + 1);
        }
        if (whatToIncrement == "month") {
            dt.setMonth(dt.getMonth() + 1);
        }
        if (whatToIncrement == "year") {
            dt.setFullYear(dt.getFullYear() + 1);
        }

        splitDate[0] = dt.getFullYear();

        splitDate[1] = "" + dt.getMonth();
        if (splitDate[1].length < 2) {
            //Concatenate "0" if month is represented with  1 digit.
            splitDate[1] = "0" + splitDate[1];
        }

        splitDate[2] = "" + dt.getDate();
        if (splitDate[2].length < 2) {
            //Concatenate "0" if date is 1 digit.
            splitDate[2] = "0" + splitDate[2];
        }

        return splitDate.join("-");
    }
}
