'use client' // client component, not server rendered
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShareIcon from '@mui/icons-material/Share';

function Footer() {

    return (
        <footer className = "pt-5">
            <div className="center">
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <FacebookOutlinedIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <TwitterIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <InstagramIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <GoogleIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <LinkedInIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <GitHubIcon className='footer-icon-size' /></a>
                <a className="btn btn-link btn-floating btn-lg text-dark" href="#!" role="button">
                    <ShareIcon className='footer-icon-size' /></a>
            </div>
            <div className="center">
                © 2020 Copyright
            </div>
        </footer>
    )
}

export default Footer