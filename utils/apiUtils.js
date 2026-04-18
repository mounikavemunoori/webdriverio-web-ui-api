import { browser } from '@wdio/globals'
import supertest from 'supertest';

class APIUtils {

       constructor() {
        this.request = supertest(browser.options.baseUrl);
    }
      // Token for update and delete operations
      async createAccessToken(tokencredentials) {
            const response = await this.request.post('/auth')
                  .send(tokencredentials)
                  .set('Content-Type', 'application/json')
            return response.body.token
      }

      // CREATE BOOKING
      async createBooking(bookingData,endpoint) {
            return await this.request
                  .post(endpoint)
                  .send(bookingData)
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');
      }

      // UPDATE BOOKING
      async updateBooking(bookingId, token, updatedData) {
        return await this.request
            .put(`/booking/${bookingId}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', `token=${token}`)
            .send(updatedData);
      }

      // GET BOOKING
      async getBooking(bookingId) {
            return await this.request.get(`/booking/${bookingId}`)
            .set('Accept', 'application/json');
      }

      // DELETE BOOKING
      async deleteBooking(bookingId, token) {
        return await this.request
            .delete(`/booking/${bookingId}`)
            .set('Cookie', `token=${token}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
      }
}

export default new APIUtils;