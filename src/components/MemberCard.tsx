import { Member } from '../app/types';
import { formatMoney } from '../app/util';
import { useMemberCard } from '../hooks/useMemberCard';
import { Button } from './Button';
import { Card } from './Card';
import { Divider } from './Divider';
import { Input } from './Input';
import { MemberName } from './MemberName';
import trash from '../assets/trash.svg';
import check from '../assets/check.svg';

interface Props {
  member: Member;
  isOpen: boolean;
  firstOpen: boolean;
  isTheOnlyMember?: boolean;
  toggleIsOpen: () => any;
  updateMember: (member: Member) => any;
  removeMember: (id: number) => any;
}

export const MemberCard = ({
  member,
  isOpen,
  firstOpen,
  updateMember,
  toggleIsOpen,
  removeMember,
  isTheOnlyMember,
}: Props) => {
  const { name, contribution, avatarName, nameRef, contributionRef, changeName, changeContribution, save } =
    useMemberCard({ member, isOpen, firstOpen, updateMember, toggleIsOpen });

  return (
    <Card onClick={isOpen ? undefined : toggleIsOpen}>
      {isOpen ? (
        <div className="flex flex-col items-stretch gap-3">
          <div className="flex w-full items-center gap-3">
            <Input
              ref={nameRef}
              className="flex-1"
              value={name}
              maxLength={24}
              placeholder={avatarName}
              onChange={(v) => changeName(v)}
              onEnter={() => contributionRef.current?.focus()}
            />
            <Input
              ref={contributionRef}
              placeholder="0.00"
              className="w-1/3"
              type="number"
              max="100"
              maxLength={12}
              value={contribution === 0 || !contribution ? '' : contribution}
              onChange={(v) => changeContribution(parseFloat(v))}
              onEnter={save}
            />
          </div>
          <Divider />
          <div className="flex w-full items-center gap-3">
            {!isTheOnlyMember && (
              <Button
                onClick={() => {
                  removeMember(member.id);
                  toggleIsOpen();
                }}
              >
                <img src={trash} alt="trash" className="h-5" />
              </Button>
            )}
            <Button onClick={save}>
              <img src={check} alt="check" className="h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center gap-3">
          <MemberName member={member} />
          <span className="text-xl font-light">{formatMoney(contribution)}</span>
        </div>
      )}
    </Card>
  );
};
