// src/components/DialogBody.js
const DialogBody = ({ children, className }) => {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
};

export default DialogBody;
