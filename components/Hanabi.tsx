export default function Hanabi({ color }: { color: string }) {
  return (
    <div className={`${color} flex justify-center py-4`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M32 30.774s-1.712-10.722-1.712-11.469s.768-1.354 1.712-1.354s1.712.606 1.712 1.354S32 30.774 32 30.774m0 2.503s1.712 10.721 1.712 11.469S32.944 46.1 32 46.1s-1.712-.605-1.712-1.354S32 33.277 32 33.277m-1.252-1.252s-10.721 1.712-11.468 1.712c-.748 0-1.354-.767-1.354-1.712c0-.944.606-1.711 1.354-1.711c.747 0 11.468 1.711 11.468 1.711m2.504 0s10.721-1.711 11.469-1.711c.747 0 1.354.767 1.354 1.711c0 .945-.606 1.712-1.354 1.712c-.748 0-11.469-1.712-11.469-1.712m-2.138-.884s-8.791-6.37-9.318-6.899c-.529-.528-.416-1.499.253-2.167c.668-.668 1.638-.781 2.167-.253c.527.528 6.898 9.319 6.898 9.319m1.772 1.77s8.791 6.37 9.318 6.899c.529.529.416 1.499-.253 2.168c-.668.668-1.638.781-2.167.252c-.527-.529-6.898-9.319-6.898-9.319m-1.772 0s-6.371 8.79-6.898 9.319c-.529.529-1.499.416-2.167-.252c-.669-.669-.782-1.639-.253-2.168c.527-.529 9.318-6.899 9.318-6.899m1.772-1.77s6.371-8.791 6.898-9.319c.529-.528 1.499-.415 2.167.253c.669.668.782 1.639.253 2.167c-.527.529-9.318 6.899-9.318 6.899m-1.73-1.203s-8.815-17.252-9.319-18.5s-.203-2.546.673-2.9c.877-.354 1.995.371 2.499 1.619c.504 1.246 6.147 19.781 6.147 19.781m1.688 4.177s8.815 17.251 9.319 18.5c.504 1.247.203 2.545-.673 2.898c-.877.355-1.995-.369-2.499-1.617s-6.147-19.781-6.147-19.781m-2.933-1.245s-17.252 8.815-18.5 9.319c-1.248.505-2.546.203-2.9-.674c-.354-.875.371-1.995 1.619-2.499c1.247-.504 19.781-6.146 19.781-6.146m4.178-1.688s17.252-8.815 18.5-9.319c1.248-.505 2.546-.202 2.9.674c.354.876-.371 1.995-1.619 2.499c-1.247.503-19.781 6.146-19.781 6.146m-4.163-.036s-18.433-5.965-19.671-6.491c-1.238-.525-1.943-1.656-1.574-2.527c.369-.869 1.674-1.148 2.912-.622c1.238.524 18.333 9.64 18.333 9.64m4.148 1.76s18.433 5.965 19.671 6.49c1.238.526 1.943 1.658 1.574 2.527c-.369.871-1.674 1.15-2.912.623c-1.238-.525-18.333-9.64-18.333-9.64M31.12 34.1s-5.965 18.433-6.491 19.672c-.526 1.238-1.657 1.943-2.527 1.574c-.87-.37-1.148-1.674-.624-2.912c.527-1.239 9.642-18.334 9.642-18.334m1.76-4.148s5.965-18.433 6.491-19.671c.526-1.239 1.657-1.943 2.527-1.574s1.149 1.672.624 2.911c-.527 1.239-9.642 18.334-9.642 18.334m-.874 17.116s1.714 12.484 1.714 13.354S32.954 62 32.009 62s-1.711-.705-1.711-1.576s1.708-13.356 1.708-13.356m-.011-31.113S30.28 4.287 30.28 3.474S31.046 2 31.991 2s1.711.659 1.711 1.473c0 .814-1.707 12.482-1.707 12.482M42.659 42.65s10.04 7.616 10.654 8.231c.617.616.574 1.656-.094 2.325c-.668.668-1.709.711-2.324.096c-.616-.614-8.236-10.652-8.236-10.652M20.651 20.658s-9.463-7.038-10.039-7.613c-.575-.576-.5-1.584.168-2.252c.668-.669 1.677-.744 2.252-.168c.576.574 7.619 10.033 7.619 10.033m22.008.691s7.62-10.036 8.236-10.651c.615-.616 1.656-.573 2.324.096c.668.668.711 1.709.094 2.324c-.614.614-10.654 8.231-10.654 8.231M20.651 43.341s-7.043 9.46-7.619 10.034c-.575.576-1.584.5-2.252-.168c-.668-.669-.743-1.677-.168-2.252c.576-.575 10.039-7.614 10.039-7.614m26.417-11.347s12.484-1.714 13.355-1.714c.871-.001 1.577.766 1.577 1.71c.001.945-.704 1.712-1.575 1.712c-.871.001-13.357-1.708-13.357-1.708m-31.112.012S4.286 33.719 3.474 33.72C2.659 33.72 2 32.953 2 32.009c0-.945.659-1.712 1.474-1.712c.812 0 12.482 1.709 12.482 1.709"
        />
        <circle cx="20.728" cy="5.096" r="1.84" fill="currentColor" />
        <circle cx="43.544" cy="5.096" r="1.84" fill="currentColor" />
        <circle cx="20.209" cy="59.025" r="1.841" fill="currentColor" />
        <circle cx="43.025" cy="59.025" r="1.841" fill="currentColor" />
        <circle cx="4.912" cy="43.209" r="1.84" fill="currentColor" />
        <circle cx="4.912" cy="20.393" r="1.84" fill="currentColor" />
        <circle cx="58.841" cy="43.728" r="1.841" fill="currentColor" />
        <circle cx="58.841" cy="20.912" r="1.84" fill="currentColor" />
      </svg>
    </div>
  );
}
