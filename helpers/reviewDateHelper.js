module.exports = {

    reviewDate: () => {

        let date =
            new Date();

        date.setDate(
            date.getDate() + 3
        );

        return date.toDateString();

    }

};