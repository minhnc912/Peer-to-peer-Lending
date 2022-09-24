import React from 'react'
import HeaderTitle from '../../components/container/header-title'
import '../styleComponent/tutorial.css'
import SideBar from '../../components/sideBar/sideBar'

const Tutorial = () => {
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Tutorial" />
                        <article className='px-3'>
                            <h3 className='text-center'>How can we help you?</h3>
                            <h4>Investors (P2P Lending)</h4>
                            <h5>What is the interest rate for P2P Lending and how specific is it?</h5>
                            <p>The interest rate is calculated according to the profile of each borrower, will range from 18 to 20% / year, calculated in X% divided by 365 days * Number of days borrowed * Loan amount. On each loan agreement will show the interest rate that the Lender will receive before deciding to lend.</p>
                            <h5>How much money do I need to be able to lend?</h5>
                            <p>You only need 01 million VND to be able to lend via P2PLending application.</p>
                            <h5>Is P2P Lending safe?
                            </h5>
                            <p>We are committed to safety and security when customers make transactions. Customers are authenticated by phone number and identity card.
                            </p>
                            <h5>If due, the borrower is unable to pay the debt, what happens to my money?</h5>
                            <p>All loan contracts will be 100% guaranteed by P2PLending, when due P2PLending will pay the principal and interest in full to the investor.
                            </p>
                            <h5>What do I need to use P2PLending?
                            </h5>
                            <p>To use the P2PLending application, you only need a computer connected to the Internet and register an account.
                            </p>
                            <h5>What are the basic information I need to update?
                            </h5>
                            <p>Please log in to your account, in the "My Profile" section will display the basic user information that needs to be updated.
                            </p>
                            <h5>Can I sign in to my account on multiple devices?
                            </h5>
                            <p>Please limit account login on multiple devices.
                            </p>
                            <h5>When I go abroad, can I use P2PLending 's services?
                            </h5>
                            <p>P2PLending has not yet deployed to provide services in foreign markets. P2PLending will update you when it has the latest information on the deployment of services in foreign markets.
                            </p>
                        </article>
                        <article className='px-3 my-5'>
                            <h4>Borrowers (P2P Lending)
                            </h4>
                            <h5>How to get a cash loan at P2P Lending?
                            </h5>
                            <p>After being issued a contract, please log in to your account and select "withdraw funds" to make withdrawals to your bank account.
                            </p>
                            <h5>What do I need to use P2P Lending?
                            </h5>
                            <p>To use the P2PLending application, you only need a computer connected to the Internet and register an account.
                            </p>
                            <h5>How to check the amount to pay for P2P Lending?
                            </h5>
                            <p>Please log in to your account, select products and services incurred => select "Borrow" to get detailed information about the amount to be paid.
                            </p>
                            <h5>Where can I view transaction and loan information?
                            </h5>
                            <p>Please log in to your account, select "Transactions" to check all details of arising spending transactions (if any)
                            </p>
                            <h5>What is the loan payment term of P2P Lending?
                            </h5>
                            <p>For loan products, the loan payment term is the 15th of every month.
                                To check the payment term of the Installment Loan or Cash Loan, please log in to your account, select "Borrow" for detailed information.
                                In case you need more information, please contact P2P Lending's 24/7 customer service at the number 1900xxxxxx for assistance.
                            </p>
                            <h5>What should I do if I have made a loan payment transfer that the system has not recognized?
                            </h5>
                            <p>Please immediately contact P2P Lending's 24/7 customer service at 1900xxxxxx to request a check.
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutorial