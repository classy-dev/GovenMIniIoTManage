import styled from '@emotion/styled';
import Modal, { ModalProps } from './Modal';

interface Props extends ModalProps {
  text?: string;
  onConfirm: () => void;
}

const ConfirmWrapper = styled.div`
  max-width: 32.8rem;
  width: 100vw;
  text-align: center;
  background-color: white;
  border-radius: 0.6rem;
  padding: 1.6rem;

  .text {
    white-space: pre-wrap;
    word-break: keep-all;
    padding: 1.6rem;
  }

  .buttons {
    margin-top: 1rem;
    width: 100%;
    display: flex;
  }

  button {
    flex-basis: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 5.6rem;
    border-radius: 0.6rem;
    font-weight: bold;
  }

  .confirm {
    background-color: #ffe9e3;
    color: #fa4616;
  }
`;

const ConfirmModal = ({ onConfirm, onClose, text, ...modalProps }: Props) => {
  return (
    <Modal {...modalProps} onClose={onClose}>
      <ConfirmWrapper className="max-w-[32.8rem] w-full ">
        <p className="text">{text}</p>

        <div className="buttons">
          <button type="button" className="confirm" onClick={() => onConfirm()}>
            저장
          </button>
          <button type="button" className="cancel" onClick={() => onClose?.()}>
            취소
          </button>
        </div>
      </ConfirmWrapper>
    </Modal>
  );
};

export const AlertModal = ({
  onClose,
  text,
  ...modalProps
}: Omit<Props, 'onConfirm'>) => {
  return (
    <Modal {...modalProps} onClose={onClose}>
      <ConfirmWrapper className="max-w-[32.8rem] w-full ">
        <p className="text">{text}</p>
        <div className="buttons">
          <button type="button" className="confirm" onClick={() => onClose?.()}>
            확인
          </button>
        </div>
      </ConfirmWrapper>
    </Modal>
  );
};

export default ConfirmModal;
