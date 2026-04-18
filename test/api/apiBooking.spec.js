import { assert } from 'chai';
import supertest from 'supertest';

import jsonData from '../../testData/bookingData.json' 
import apiUtils from '../../utils/apiUtils';



describe('Create Booking API Tests', async()=> {
    
    let token;
    let bookingId;
    
    before(async()=>{
        token = await apiUtils.createAccessToken(jsonData['tokenCredentials'])
     })

    it('TC01 - Verify that creating a booking is successful', async()=>{
        const bookingData=  jsonData['originalBookingData']
        const response = await apiUtils.createBooking(bookingData, '/booking')

        assert.equal(response.status,200, 'Expected status code to be 200');
        assert.isTrue(Object.keys(response.body).includes('bookingid'), 'Response should contain bookingid');
        bookingId = response.body.bookingid;
        console.log('Created Booking ID:', bookingId);

        assert.deepEqual(response.body.booking, bookingData, 'Response booking data should match the sent data');
    })

     // GetBooking API Endpoint Tests
    it('TC02 - Verify that retrieving a booking is successful', async()=> {
        const response = await apiUtils.getBooking(bookingId)
        assert.equal(response.status,200, 'Expected status code to be 200');
        assert.deepEqual(response.body, jsonData['originalBookingData'], 'Response booking data should match the original data');
    })

    it('TC03 - Verify GET booking returns 404 for invalid booking ID', async()=>{
        const invalidBookingId = '999999999'
        const response = await apiUtils.getBooking(invalidBookingId)
        assert.equal(response.status,404, 'Expected status code to be 200');
    })

    // UpdateBooking API Endpoint Tests
    it('TC04 - Verify that updating a booking is successful', async()=> {
        const updatedBookingData = jsonData['updateBookingData']
        const response = await apiUtils.updateBooking(bookingId, token, updatedBookingData)

        assert.equal(response.status,200, 'Expected status code to be 200');
        assert.deepEqual(response.body, updatedBookingData, 'Response booking data should match the updated data');
    })

    // Update booking with invalid token
    it('TC05 - Verify update booking fails with invalid token', async()=>{
        const updatedBookingData = jsonData['updateBookingData']
        const invalidToken = "invalid_token_123"
        const response = await apiUtils.updateBooking(bookingId, invalidToken, updatedBookingData)

        assert.equal(response.status, 403, 'Expected status code to be 200');
    })

    // Delete Booking
    it('TC06 - Verify that deleting the booking is successful', async()=>{
        const response = await apiUtils.deleteBooking(bookingId, token)

        // Status 201 for successful delete
        assert.equal(response.status, 201)
        
        // Verify that the booking no longer exists
        const getRes = await apiUtils.getBooking(bookingId)

        assert.equal(getRes.status, 404)
        console.log(`Booking is deleted successfully`)
    })

})