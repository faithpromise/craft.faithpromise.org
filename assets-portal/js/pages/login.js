export default {

    init() {
        updateForgotPasswordButton();
        addLoginIntro();
    }

}

let login_intro = `
    <h1>Welcome to the new <span class="nowrap">Faith Promise</span> Portal</h1>
    <p>
      If you haven't already done so, please <a href="/portal/create_account.aspx">Sign Up</a>.
      Creating an account will provide you with giving history and allow you to give more easily in the future. Or, you can always <a href="">Give as a Guest</a>.
      Thank you so much for helping us make this transition and furthering the mission of Faith Promise Church. If you have questions or need assistance, please contact us by sending an email to <a href="mailto:giving@faithpromise.org">giving@faithpromise.org</a>.
    </p>
`;

function addLoginIntro() {

    /**
     | Adds a intro section to the login page.
     */

    let id = 'SignUp';

    if (document.getElementById(id))
        return;

    let el       = document.createElement('div');
    el.setAttribute('id', id);
    el.className = 'SignUp';
    el.innerHTML = login_intro;
    document.getElementById('UpdatePanel1').appendChild(el);
}

function updateForgotPasswordButton() {

    /**
     | Ministry Platform's "Forgot Your Password?" button says, "Reset Account"
     | Let's make it say, "Forgot Your Password."
     */

    document.getElementById('btnForgotPassword').innerText = 'Recover Your Password';
}