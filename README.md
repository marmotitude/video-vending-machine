# content-vending-machine
Example of a downloads vending machine using a service API(alby? opennode?) for payments and Magalu Object API for objects hosting

as featured in [this presentation](https://docs.google.com/presentation/d/1pC5XIEzaTNzWhgbYP_LhtFpiL8kaBxYQFL_k62zIkbw/edit?usp=sharing)

## Demo

```
cp .env.example .env
vim .env
curl localhost:3000/products/a/invoice | jq .invoice | ./node_modules/.bin/qrcode-terminal
curl localhost:3000/products/a/download
```
