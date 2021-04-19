import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const ListBox = ({
  value,
  onChange,
  disabled,
  array,
  placeHolder,
  label,
  bg,
}) => {
  return (
    <div className="w-64">
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ disabled }) => {
          return (
            <>
              <Listbox.Label>{label}</Listbox.Label>
              <Listbox.Button
                className={` ${
                  disabled
                    ? 'bg-gray-300 text-gray-700 hover:bg-gray-300 '
                    : ' bg-white text-gray-700 hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-700 '
                } inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg:white text-sm font-medium  ' } `}
              >
                {disabled ? placeHolder[0] : value ? value : placeHolder[1]}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Listbox.Button>
              <Listbox.Options className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  divide-y-2 divide-gray-200">
                {() => {
                  return (
                    <>
                      {array.map((val) => (
                        <Listbox.Option
                          key={val}
                          value={val}
                          disabled={!array.length}
                        >
                          {({ active, disabled }) => (
                            <option
                              className={`
                                ${
                                  active
                                    ? `bg-${bg ? val : 'red-700'}` +
                                      ' text-white'
                                    : disabled
                                    ? 'bg-gray-500 text-gray-300'
                                    : 'text-gray-800'
                                } px-4 py-2 text-sm`}
                            >
                              {val}
                            </option>
                          )}
                        </Listbox.Option>
                      ))}
                    </>
                  );
                }}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
};

export default ListBox;
