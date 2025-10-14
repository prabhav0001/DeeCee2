"use client"

import React from "react";
import { Truck, Package, FileText } from "lucide-react";

export default function TermsPage(): React.ReactElement {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-rose-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Policies</h1>
        </div>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-10">
          {/* Shipping Policy */}
          <section className="border-b border-gray-200 pb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-6 h-6 text-rose-600" />
              SHIPPING POLICY
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped and delivered within 5 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
            </p>
          </section>

          {/* Return and Refund Policy */}
          <section className="border-b border-gray-200 pb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-rose-600" />
              RETURN AND REFUND POLICY
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">RETURN POLICY</h3>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <p>
                    We offer return / exchange within the first 7 days from the date of your purchase. If 7 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The purchased item should be unused and in the same condition as you received it</li>
                    <li>The item must have original packaging</li>
                    <li>If the item that you purchased on a sale, then the item may not be eligible for a return / exchange</li>
                  </ul>
                  <p>
                    Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
                  </p>
                  <p className="font-medium">
                    All the exchanged/replaced/damaged product will be delivered within 5-7 business days.
                  </p>
                  <p>
                    You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further, if the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">REFUND POLICY</h3>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <p>
                    This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Cancellations will only be considered if the request is made 7 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.</li>
                    <li>In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 7 days of receipt of products.</li>
                    <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.</li>
                    <li>In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.</li>
                    <li className="font-medium">In case of any refunds approved by SUMIT EXIM, it will take 15 days for the refund to be credited to the original payment mode.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-rose-600" />
              TERMS AND CONDITIONS
            </h2>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base">
              <p>
                This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
              </p>
              <p>
                This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name https://dee-cee2.vercel.app/ ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
              </p>
              <p>
                Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
              </p>
              <p>
                For the purpose of these Terms of Use, wherever the context so requires 'you', 'your' or 'user' shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
              </p>
              <p className="font-semibold uppercase">
                ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
              </p>
              <p>
                The use of Platform and/or availing of our Services is subject to the following Terms of Use:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.</li>
                <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                <li>Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.</li>
                <li>The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.</li>
                <li>You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.</li>
                <li>You agree to pay us the charges associated with availing the Services.</li>
                <li>You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</li>
                <li>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.</li>
                <li>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.</li>
                <li>You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.</li>
                <li>Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.</li>
                <li>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</li>
                <li>All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.</li>
              </ol>
            </div>
          </section>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
              <h3 className="font-semibold text-gray-900">Contact Information</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p className="text-gray-700"><span className="font-semibold">Email:</span> sumiteximjjn@gmail.com</p>
                <p className="text-gray-700"><span className="font-semibold">Phone:</span> +91 63764 82804</p>
                <p className="text-gray-700"><span className="font-semibold">Address:</span> Swastik Tower, Joshiyo Ka Gatta, Jhunjhunu, Rajasthan</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base italic mt-6">
              By using the DEECEE HAIR website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
