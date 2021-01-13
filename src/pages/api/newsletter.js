import axios from "axios";

function getRequestParams(email) {
    // const API_KEY = process.env.MAILCHIMP_API_KEY;
    // const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // const DATACENTER = process.env.MAILCHIMP_API_KEY.split("-")[1];

    const API_KEY = "633f606915c9e2c5d6d4d823d38e56ea-us7";
    const LIST_ID = "9dc8738a08";
    const DATACENTER = "633f606915c9e2c5d6d4d823d38e56ea-us7".split("-")[1];

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
        email_address: email,
        status: "subscribed",
    };

    // Api key needs to be encoded in base 64 format
    const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64ApiKey}`,
    };
    return {
        url,
        data,
        headers,
    };
}

export default async (req, res) => {
    const { email } = req.body;

    if (!email || !email.length) {
        return res.status(400).json({
            error: "Forgot to add your email?",
        });
    }

    try {
        const { url, data, headers } = getRequestParams(email);

        const response = await axios.post(url, data, { headers });

        // Success
        return res.status(201).json({ error: null });
    } catch (error) {
        return res.status(400).json({
            error: `Oops, something went wrong..`,
        });

        // Report error to Sentry or whatever
    }
};
