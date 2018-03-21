module.exports = {
    prettifyAsHTML(json) {
        return json
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/("(?:\w|[ :|.-])+")/g, `<span class="string">$1</span>`)
            .replace(/\n/g, "<br />")
    },

    getTimeSince(date) {
        const delta = Date.now() - date.getTime()

        const seconds = delta / 1000
        const minutes = seconds / 60
        const hours = minutes / 60
        const days = hours / 24
        const months = days / 30
        const years = months / 12

        if (years > 1) {
            return `${Math.round(years)} years`
        }
        if (months > 1) {
            return `${Math.round(months)} months`
        }
        if (days > 1) {
            return `${Math.round(days)} days`
        }
        if (hours > 1) {
            return `${Math.round(hours)} hours`
        }
        if (minutes > 1) {
            return `${Math.round(minutes)} minutes`
        }
        if (seconds > 1) {
            return `${Math.round(seconds)} seconds`
        }

        return `${delta} ms`

    }
}
