import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      generatePaymentConfig: builder.mutation({
          query: orderDetails => ({
              url: '/payment/config',
              method: 'POST',
              body: { ...orderDetails }
          })
      }),
  })
})

export const {
  useGeneratePaymentConfigMutation
} = paymentApiSlice
