function Home() {
  return (
    <>
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <h1 className="govuk-heading-xl">Get Started with your GP Registration</h1>

          <p className="govuk-body">This service is used to register for GP services.</p>

          <span className="govuk-body">
            <ul>
              <li>Book Appointment</li>
              <li>Manage Your account</li>
              <li>View Medical Records</li>
            </ul>
          </span>

          <p className="govuk-body">Click on the start now button below to continue with the registration.</p>

          <a href='/select' role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
            Start now
            <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </a>
          
        </main>
      </div>
    </>
  );
}

export default Home;