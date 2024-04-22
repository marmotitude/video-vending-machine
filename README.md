# content-vending-machine
Example of a downloads vending machine using a service API(alby? opennode?) for payments and Magalu Object API for objects hosting

as featured in [this presentation](https://youtu.be/9YHfbIhR8xU?si=dnGtJEH98bJxqvH9)

## Demo

```
cp .env.example .env
vim .env
node .
```

```
# generate invoice to unlock the download
curl localhost:3000/products/a/invoice | jq . | tee product_a_invoice.json

# print the invoice as a QR Code in the terminal (and pay it with a mobile wallet)
cat product_a_invoice.json | jq -r .payment_request | ./node_modules/.bin/qrcode-terminal

# print the temporary download URL of the paid product (will have status 402 if not paid)
curl -v localhost:3000/products/a/download?payment_hash=$(cat product_a_invoice.json |jq -r .payment_hash)

# follow the redirect to the contents
curl -L localhost:3000/products/a/download?payment_hash=$(cat product_a_invoice.json |jq -r .payment_hash)
```
