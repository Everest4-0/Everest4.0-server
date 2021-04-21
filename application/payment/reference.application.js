const axios = require('axios');

class ReferenceApplication {

    endpoint = 'https://api.sandbox.proxypay.co.ao'
    authorization = 'Token zkfzbu3cqqx46hp3tedvpzsbobsjwsvr'
    headers = {
        'Authorization': this.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
    create = async (data) => {

        let final = await axios.put(
            this.endpoint + '/references/' + data.custom_fields.reference,
            data,
            {
                headers:
                    this.headers
            }

        ).then(function (data) {

            return data;
        }).catch(function (e) {

            console.log(e);

        });

        return final;
    }

    delete = (data, callback) => {

        axios({

            url: this.endpoint + '/references/' + data.custom_fields.reference,

            method: 'DELETE',

            headers: this.headers

        }).then(function (data) {

            console.log(res);
            callback(data)

        }).catch(function (err) {

            console.log(err);

            callback(err)

        });
    }
}

module.exports = new ReferenceApplication();