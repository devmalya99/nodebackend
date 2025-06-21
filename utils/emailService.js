import nodemailer from 'nodemailer';

// Verify SMTP configuration
const verifyEmailConfig = () => {
    const requiredConfigs = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
    const missingConfigs = requiredConfigs.filter(config => !process.env[config]);
    
    if (missingConfigs.length > 0) {
        throw new Error(`Missing email configuration: ${missingConfigs.join(', ')}`);
    }
};

// Create transporter with verification
const createTransporter = async () => {
    verifyEmailConfig();
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // Verify SMTP connection
    try {
        await transporter.verify();
        console.log('SMTP connection verified successfully');
        return transporter;
    } catch (error) {
        console.error('SMTP connection failed:', error);
        throw new Error('Failed to establish SMTP connection');
    }
};

// Send password email with enhanced error handling
export const sendPasswordEmail = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const transporter = await createTransporter();
        
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Your Account Password - Business Doctor',
            html: `
                <h2>Welcome to Business Doctor!</h2>
                <p>Your account has been created successfully.</p>
                <p>Here is your system-generated password: <strong>${password}</strong></p>
                <p>Please change your password after your first login for security purposes.</p>
                <p>If you did not create this account, please contact our support team immediately.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending password email:', error);
        throw new Error('Failed to send password email: ' + error.message);
    }
};