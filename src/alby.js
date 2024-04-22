import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

export async function generateInvoice(amount, description){
  try {
    // Make a POST request to Alby's API
    const response = await axios.post('https://api.getalby.com/invoices', {
      description,
      amount,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ALBY_ACCESS_TOKEN}`,
      }
    });
    const payment_request = response?.data?.payment_request;
    if (! payment_request) {
      console.error('no payment_request', response);
      throw new Error('Error creating invoice')
    }
    const payment_hash = response?.data?.payment_hash;
    // success
    return { payment_request, payment_hash}
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw new Error('Error creating invoice')
  }
}

export async function getInvoice(paymentHash){
  try {
    // Make a GET request to Alby's API
    const response = await axios.get(`https://api.getalby.com/invoices/${ paymentHash }`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ALBY_ACCESS_TOKEN}`,
      }
    });
    return response.data
  } catch (error) {
    console.error('Error checking payment:', error);
    throw new Error('Error checking payment')
  }

}
