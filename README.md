# content-vending-machine
Example of a downloads vending machine using a service API(alby? opennode?) for payments and Magalu Object API for objects hosting

as featured in [this presentation](https://youtu.be/9YHfbIhR8xU)

## Demo

```
cp .env.example .env
vim .env
node .
```

```
# generate invoice to unlock the download
curl localhost:3000/products/a/invoice | jq -r .invoice | tee product_a_invoice.txt 

# print the invoice as a QR Code in the terminal (and pay it with a mobile wallet)
cat product_a_invoice.txt | ./node_modules/.bin/qrcode-terminal

# print the temporary download URL of the paid product
curl localhost:3000/products/a/download

# follow the redirect to the contents
curl localhost:3000/products/a/downloada -L
```
