import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../loginpage/UserContext';
import './Profile.css'; // You can create a CSS file for styling
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const Profile = () => {
  const { users, updateUser } = useContext(UserContext); // Add updateUser function from the context
  const currentUser = users.length > 0 ? users[0] : { username: 'Guest' }; // Assuming you want to display the profile of the first user

  const defaultAvatarURL =
    'https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=';

  // State for selected avatar and edited image data
  const [selectedAvatar, setSelectedAvatar] = useState(
    // Check local storage for the saved image URL or use the default
    localStorage.getItem('profilepic')|| defaultAvatarURL
  );
  const [editedImageData, setEditedImageData] = useState(null); // Edited image data
  const [editor, setEditor] = useState(null); // Avatar editor reference
  const [editingMode, setEditingMode] = useState(false); // Track editing mode
  const [isProfilePictureRemoved, setIsProfilePictureRemoved] = useState(
    !localStorage.getItem('profilepic') // Check if profile pic is saved in local storage
  );
  const [isSubscribed,setIsSubscribed]=useState(false)
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedAvatar(url);
      setEditingMode(true); // Enter editing mode when an image is uploaded
      localStorage.setItem('profilepic', url);
    }
  };

  const handleImageReady = async () => {
    if (editor) {
      const editedDataUrl = editor.getImage().toDataURL();
      setEditedImageData(editedDataUrl); // Save the edited image data
      try {
        const updatedUserData = {
          ...currentUser,
          profilePicture: editedDataUrl, // Update the profile picture with edited data
        };
        await updateUser(updatedUserData); // Assuming updateUser returns a promise
        // Provide user feedback for a successful update
        setEditingMode(false); // Exit editing mode after saving
      } catch (error) {
        // Handle errors and show an error message to the user
      }
    }
  };
const handleSubmit=(e) =>{
    e.preventDefault()
    if(!isSubscribed&&!localStorage.getItem('isSubscribed')){
        openCreditCardModal()
    }else{openModal()}
}
const openCreditCardModal = () => {
    if (!isSubscribed) {
        setIsCreditCardModalOpen(true);
    }
};

const closeCreditCardModal = () => {
    setIsCreditCardModalOpen(false);
};
const handleCreditCardSubmit = (e) => {
    e.preventDefault();

    // Create an object to store the fake credit card information
    const fakeCreditCard = {
        cardNumber,
        cardName,
        expirationDate,
        cvv,
    };
    
    setIsSubscribed(true);
    localStorage.setItem('isSubscribed', 'true');
    // Save the fake credit card information to local storage as a JSON string
    localStorage.setItem('fakeCreditCard', JSON.stringify(fakeCreditCard));
    localStorage.setItem('hasCreditCard', 'true');

    // Optionally, clear the form inputs after saving
    setCardNumber('');
    setCardName('');
    setExpirationDate('');
    setCVV('');
    // Close the credit card modal
    closeCreditCardModal();
};
  const removeProfilePicture = () => {
    setSelectedAvatar(defaultAvatarURL);
    setEditedImageData(null);
    setIsProfilePictureRemoved(false);
    localStorage.removeItem('profilepic');
  };

  const exitEditMode = () => {
    setEditingMode(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
};
const openModal = () => {
        setIsModalOpen(true);
    
};
useEffect(() => {
    const savedProfilePic = localStorage.getItem('profilepic');
    if (savedProfilePic) {
      setSelectedAvatar(savedProfilePic);
      setIsProfilePictureRemoved(false);
    }
  }, []); 
  return (
    <div className="profile-container">
      <div className="avatar-section">
      <div className="profile-header">
        <h1>Hello, {currentUser.username}!</h1>
      </div>
      {!editingMode && isProfilePictureRemoved && (
        <input
          id="uploadButton"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      )}
        <div className="avatar-options">
          {selectedAvatar && (
            <>
              {editingMode ? (
                <>
                  <AvatarEditor
                    ref={(editor) => setEditor(editor)}
                    image={selectedAvatar}
                    width={200}
                    height={200}
                    border={50}
                    // borderRadius={100}
                    scale={1.2}
                    rotate={0}
                    onImageReady={handleImageReady}
                  />
                  <button id="exitButton" onClick={exitEditMode}>
                    Exit Edit Mode
                  </button>
                </>
              ) : (
                <img
                  src={editedImageData || selectedAvatar}
                  alt="Profile Avatar"
                  className="profile-avatar"
                  width={'60%'}
                  height={'60%'}
                />
              )}
              {selectedAvatar !== defaultAvatarURL && (
                <button id="removeButton" onClick={removeProfilePicture}>
                  Remove Profile Picture
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="subscriptions">
        <form onSubmit={handleSubmit}>
        <h2>Subscribe for more features:</h2>
        <div className="subscription-options">
          <div className="subscription-option">
            <div className="subscription-card">
              <h3>Free Trial</h3>
              <p>Get 3 days of free access</p>
              <p>Free</p>
              <button>Subscribe</button>
            </div>
          </div>
          <div className="subscription-option">
            <div className="subscription-card">
              <h3>3 Months</h3>
              <p>Unlock premium features for 3 months</p>
              <p>19.99$</p>
              <button>Subscribe</button>
            </div>
          </div>
          <div className="subscription-option">
            <div className="subscription-card">
              <h3>One Year</h3>
              <p>Enjoy a full year of premium access</p>
              <p>45.99$</p>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        </form>
      </div>
      <Modal
                id='creditCardModal'
                isOpen={isCreditCardModalOpen}
                onRequestClose={closeCreditCardModal}
                contentLabel="Credit Card Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3,
                        height: 'auto', // Adjust the height as needed
                        width: '350px', // Adjust the width as needed
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflowY: 'hidden',
                        borderRadius: '10px', // Rounded corners
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Box shadow
                        background: 'linear-gradient(to bottom, #f6f9fc, #e9f2f9)', // Background gradient
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay background color
                    },
                }}
            >
                <div id='creditCardModalContent'>
                    <img id='creditImage' src=".\src\assets\realistic-credit-card-design_23-2149124864-removebg-preview.png" alt="Credit Card" />
                    <h2 id='creditCardHeader'>Enter Your Card Details</h2>
                    <form onSubmit={handleCreditCardSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input
                                type="text"
                                id="cardNumber"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardName">Cardholder Name:</label>
                            <input
                                type="text"
                                id="cardName"
                                placeholder="Cardholder Name"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationDate">Expiration Date:</label>
                            <input
                                type="text"
                                id="expirationDate"
                                placeholder="MM/YY"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV:</label>
                            <input
                                type="text"
                                id="cvv"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCVV(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="form-button">Save Fake Credit Card</button>
                    </form>


                    <button id='cancelCreditCard' onClick={closeCreditCardModal}>Cancel</button>
                </div>
            </Modal>
            <Modal id='modalCont'
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Subscription Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3,
                        height: '40vh',
                        width: '50vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflowY: 'hidden'
                    },
                }}
            >
                <div>
                    <h1>
                        you are already subscribed!
                    </h1>
                </div>
            </Modal>
    </div>
  );
};

export default Profile;