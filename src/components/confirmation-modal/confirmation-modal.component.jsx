import { ModalOverlay, ModalContent, ModalHeader, ModalTitle, ButtonContainer, ConfirmButton, CancelButton } from './confirmation-modal.styles.jsx';
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirmation</ModalTitle>
          <CloseIcon onClick={onCancel}/>
        </ModalHeader>
        <p>{message}</p>
        <ButtonContainer>
            <CancelButton onClick={onCancel}>NO, KEEP IT</CancelButton>
          <ConfirmButton onClick={onConfirm}>YES, DELETE</ConfirmButton>
          
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;