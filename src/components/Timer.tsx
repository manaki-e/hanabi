'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { CircularProgress } from '@nextui-org/progress';
import { useEffect, useState } from 'react';

import { TEACH_TOKEN } from '@/lib/constant';

import { useTimer } from './function/timer.hooks';

export default function Timer({
  room_id,
  player_id,
  disabled,
  teach_token,
  opponent_hand,
}: {
  room_id: string;
  player_id: string;
  disabled: boolean;
  teach_token: number;
  opponent_hand: { color: string; number: number }[];
}) {
  const timeLeft = useTimer({ disabled });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  const hintTypes = Math.random() < 0.5 ? 'color' : 'number';
  const hint =
    hintTypes === 'color'
      ? uniqueColors[Math.floor(Math.random() * uniqueColors.length)]
      : uniqueNumbers[Math.floor(Math.random() * uniqueNumbers.length)];

  useEffect(() => {
    if (timeLeft < 0) {
      const formData = new FormData();
      if (teach_token === TEACH_TOKEN) {
        formData.append('form_id', 'hint');
        formData.append('teach', hintTypes);
        formData.append(hintTypes, String(hint));
      } else {
        formData.append('form_id', 'action');
        formData.append('index', '0');
        formData.append('act', 'trash');
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}?time=30`, {
        method: 'POST',
        body: formData,
      });
      if (teach_token === TEACH_TOKEN) {
        onOpen();
        setModalMessage('そのため、自動的にヒントを与えました。');
      } else {
        onOpen();
        setModalMessage('そのため、自動的に一番左のカードを捨てました。');
      }
      setTimeout(() => {
        onOpenChange();
        if (isOpen) {
          window.location.reload();
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, hint, hintTypes, player_id, room_id, teach_token]);

  return (
    <>
      <CircularProgress
        classNames={{
          svg: 'w-28 h-28 drop-shadow-md',
          indicator: 'stroke-danger',
          track: 'stroke-white/10',
          value: 'text-3xl font-semibold text-danger',
        }}
        formatOptions={{ style: 'decimal' }}
        label="残り時間"
        maxValue={30}
        minValue={0}
        showValueLabel={true}
        strokeWidth={3}
        value={timeLeft}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          window.location.reload();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="pt-4 text-sm">
                  時間切れです！
                  <br />
                  {modalMessage}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                    window.location.reload();
                  }}
                  variant="light"
                >
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
