import { useNavigate } from "react-router-dom";

function DeleteConfirmation() {

    const navigate = useNavigate()


  const handleSumbit = (e) => {
    e.preventDefault();

    localStorage.clear();
        navigate('/register');
  }
    return (
        <>
            <div className="govuk-width-container ">
                <a href="/patientrecords" className="govuk-back-link">Back</a>
                <main className="govuk-main-wrapper " id="main-content" role="main">
                    <h1 className="govuk-heading-xl">Are You sure you want to delete your account?</h1>
                    <div className="govuk-button-group">
                        <button className="govuk-button govuk-button--warning" data-module="govuk-button" onClick={handleSumbit}>
                            Delete account
                        </button>
                        <a className="govuk-link" href="/patientrecords">
                            Cancel
                        </a>
                    </div>

                </main>
            </div>
        </>
    )
}

export default DeleteConfirmation;