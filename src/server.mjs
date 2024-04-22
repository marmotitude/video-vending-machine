// ./src/server.mjs
import express from 'express';
import { generatePresignedUrl } from './s3.js';
import { generateInvoice } from './alby.js';

const app = express();
const port = 3000;

const products = {
  a: { price: 100, description: "Franz Kafka - A tribulação de um pai de família", key: "odradek.txt" },
  b: { price: 200, description: "Product B", key: "product_b.png" },
  c: { price: 300, description: "Product B", key: "product_c.flac" },
};

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get invoice to buy a product
app.get('/products/:productId/invoice', async (req, res) => {
    const productId = req.params.productId;
    const product = products[productId];

    if (!product) {
        return res.status(404).send('Product not found');
    }

    try {
        // Generate invoice using Alby API
        const invoice = await generateInvoice(product.price, product.description);

        // Return the invoice details as JSON response
        res.status(200).json({ invoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).send('Error creating invoice');
    }
});

// Endpoint to get presigned URL to download a product
app.get('/products/:productId/download', async (req, res) => {
    const productId = req.params.productId;
    const product = products[productId];

    if (!product) {
        return res.status(404).send('Product not found');
    }

    const expirationSeconds = 3600; // Presigned URL expiration time (1 hour)

    try {
        // Generate presigned URL for S3 object (product image)
        const presignedUrl = await generatePresignedUrl(process.env.S3_BUCKET_NAME, product.key, expirationSeconds);

        // Redirect client to the presigned URL
        res.redirect(presignedUrl);
    } catch (error) {
        console.log({error})
        console.error('Error generating presigned URL:', error);
        res.status(500).send('Error generating presigned URL');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
