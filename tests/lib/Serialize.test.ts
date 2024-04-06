import { Serialize } from '../../src';

describe('Serialize', () => {
  const rawBigInt = 0n;
  const rawBoolean = false;
  const rawDate = new Date();
  const rawNull = null;
  const rawNumber = 0;
  const rawRegExp = /test/g;
  const rawString = 'test';
  const rawUndefined = undefined;
  const jsonBigInt = rawBigInt.toString();
  const jsonBoolean = rawBoolean;
  const jsonDate = rawDate.toJSON();
  const jsonNumber = rawNumber;
  const jsonRegExp = { [Serialize.Keying.Source]: rawRegExp.source, [Serialize.Keying.Flags]: rawRegExp.flags };
  const jsonString = rawString;

  describe('Serialize.toJsonCompatible', () => {
    test('GIVEN typeof toJsonCompatible THEN returns functions', () => {
      expect(typeof Serialize.toJsonCompatible).toBe('function');
    });

    describe('can format raw data', () => {
      describe(Serialize.Type.Array.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawBigInt]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawBoolean]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawDate]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawNull]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Null }]);
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawNumber]);

            expect(type).toBe(Serialize.Type.Array);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]);
          });

          test('GIVEN NaN THEN returns NaN', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([NaN]);

            expect(type).toBe(Serialize.Type.Array);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]);
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([Infinity]);

            expect(type).toBe(Serialize.Type.Array);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]);
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([-Infinity]);

            expect(type).toBe(Serialize.Type.Array);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]);
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawRegExp]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawString]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible([rawUndefined]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Undefined }]);
        });
      });

      test(Serialize.Type.BigInt.toString(), () => {
        const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawBigInt);

        expect(type).toBe(Serialize.Type.BigInt);
        expect(value).toStrictEqual(jsonBigInt);
      });

      test(Serialize.Type.Boolean.toString(), () => {
        const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawBoolean);

        expect(type).toBe(Serialize.Type.Boolean);
        expect(value).toStrictEqual(jsonBoolean);
      });

      test(Serialize.Type.Date.toString(), () => {
        const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawDate);

        expect(type).toBe(Serialize.Type.Date);
        expect(value).toStrictEqual(jsonDate);
      });

      describe(Serialize.Type.Map.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawBigInt]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawBoolean]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawDate]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawNull]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Null }]]);
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawNumber]]));

            expect(type).toBe(Serialize.Type.Map);
            expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]]);
          });

          test('GIVEN NaN THEN returns NaN', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', NaN]]));

            expect(type).toBe(Serialize.Type.Map);
            expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]]);
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', Infinity]]));

            expect(type).toBe(Serialize.Type.Map);
            expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]]);
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', -Infinity]]));

            expect(type).toBe(Serialize.Type.Map);
            expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]]);
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawRegExp]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawString]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Map([['key', rawUndefined]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { [Serialize.Keying.Type]: Serialize.Type.Undefined }]]);
        });
      });

      test(Serialize.Type.Null.toString(), () => {
        const { [Serialize.Keying.Type]: type } = Serialize.toJsonCompatible(rawNull);

        expect(type).toBe(Serialize.Type.Null);
      });

      describe(Serialize.Type.Number.toString(), () => {
        test('GIVEN number THEN returns number', () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawNumber);

          expect(type).toBe(Serialize.Type.Number);
          expect(value).toStrictEqual(jsonNumber);
        });

        test('GIVEN NaN THEN returns NaN', () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(NaN);

          expect(type).toBe(Serialize.Type.Number);
          expect(value).toStrictEqual('NaN');
        });

        test('GIVEN Infinity THEN returns Infinity', () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(Infinity);

          expect(type).toBe(Serialize.Type.Number);
          expect(value).toStrictEqual('Infinity');
        });

        test('GIVEN -Infinity THEN returns -Infinity', () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(-Infinity);

          expect(type).toBe(Serialize.Type.Number);
          expect(value).toStrictEqual('-Infinity');
        });
      });

      describe(Serialize.Type.Object.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawBigInt });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt } });
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawBoolean });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean } });
        });

        test(Serialize.Type.Date.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawDate });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate } });
        });

        test(Serialize.Type.Null.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawNull });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Null } });
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawNumber });

            expect(type).toBe(Serialize.Type.Object);
            expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber } });
          });

          test('GIVEN NaN THEN returns NaN', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: NaN });

            expect(type).toBe(Serialize.Type.Object);
            expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' } });
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: Infinity });

            expect(type).toBe(Serialize.Type.Object);
            expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' } });
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: -Infinity });

            expect(type).toBe(Serialize.Type.Object);
            expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' } });
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawRegExp });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp } });
        });

        test(Serialize.Type.String.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawString });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString } });
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible({ key: rawUndefined });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { [Serialize.Keying.Type]: Serialize.Type.Undefined } });
        });
      });

      test(Serialize.Type.RegExp.toString(), () => {
        const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawRegExp);

        expect(type).toBe(Serialize.Type.RegExp);
        expect(value).toStrictEqual(jsonRegExp);
      });

      describe(Serialize.Type.Set.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawBigInt]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawBoolean]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawDate]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawNull]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Null }]);
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawNumber]));

            expect(type).toBe(Serialize.Type.Set);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]);
          });

          test('GIVEN NaN THEN returns NaN', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([NaN]));

            expect(type).toBe(Serialize.Type.Set);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]);
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([Infinity]));

            expect(type).toBe(Serialize.Type.Set);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]);
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([-Infinity]));

            expect(type).toBe(Serialize.Type.Set);
            expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]);
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawRegExp]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawString]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(new Set([rawUndefined]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ [Serialize.Keying.Type]: Serialize.Type.Undefined }]);
        });
      });

      test(Serialize.Type.String.toString(), () => {
        const { [Serialize.Keying.Type]: type, [Serialize.Keying.Value]: value } = Serialize.toJsonCompatible(rawString);

        expect(type).toBe(Serialize.Type.String);
        expect(value).toStrictEqual(jsonString);
      });

      test(Serialize.Type.Undefined.toString(), () => {
        const { [Serialize.Keying.Type]: type } = Serialize.toJsonCompatible(rawUndefined);

        expect(type).toBe(Serialize.Type.Undefined);
      });
    });

    test('GIVEN unknown type THEN throws error', () => {
      expect(() => Serialize.toJsonCompatible(() => true)).toThrowError(
        new TypeError('Serialize.toJsonCompatible() received an unknown type while formatting: "Function".')
      );
    });
  });

  describe('Serialize.fromJsonCompatible', () => {
    test('GIVEN typeof fromJsonCompatible THEN returns function', () => {
      expect(typeof Serialize.fromJsonCompatible).toBe('function');
    });

    describe('can parse json data', () => {
      describe(Serialize.Type.Array.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]
            })
          ).toStrictEqual([rawBigInt]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]
            })
          ).toStrictEqual([rawBoolean]);
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]
            })
          ).toStrictEqual([rawDate]);
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Null }]
            })
          ).toStrictEqual([rawNull]);
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Array,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]
              })
            ).toStrictEqual([rawNumber]);
          });

          test('GIVEN NaN THEN returns NaN', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Array,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]
              })
            ).toStrictEqual([NaN]);
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Array,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]
              })
            ).toStrictEqual([Infinity]);
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Array,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]
              })
            ).toStrictEqual([-Infinity]);
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]
            })
          ).toStrictEqual([rawRegExp]);
        });

        test(Serialize.Type.String.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]
            })
          ).toStrictEqual([rawString]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Array,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Undefined }]
            })
          ).toStrictEqual([rawUndefined]);
        });
      });

      test(Serialize.Type.BigInt.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt })).toBe(
          rawBigInt
        );
      });

      test(Serialize.Type.Boolean.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean })).toBe(
          rawBoolean
        );
      });

      test(Serialize.Type.Date.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate })).toStrictEqual(
          rawDate
        );
      });

      describe(Serialize.Type.Map.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]]
            })
          ).toStrictEqual(new Map([['key', rawBigInt]]));
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]]
            })
          ).toStrictEqual(new Map([['key', rawBoolean]]));
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]]
            })
          ).toStrictEqual(new Map([['key', rawDate]]));
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Null }]]
            })
          ).toStrictEqual(new Map([['key', rawNull]]));
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Map,
                [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]]
              })
            ).toStrictEqual(new Map([['key', rawNumber]]));
          });

          test('GIVEN NaN THEN returns NaN', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Map,
                [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]]
              })
            ).toStrictEqual(new Map([['key', NaN]]));
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Map,
                [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]]
              })
            ).toStrictEqual(new Map([['key', Infinity]]));
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Map,
                [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]]
              })
            ).toStrictEqual(new Map([['key', -Infinity]]));
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]]
            })
          ).toStrictEqual(new Map([['key', rawRegExp]]));
        });

        test(Serialize.Type.String.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]]
            })
          ).toStrictEqual(new Map([['key', rawString]]));
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Map,
              [Serialize.Keying.Value]: [['key', { [Serialize.Keying.Type]: Serialize.Type.Undefined }]]
            })
          ).toStrictEqual(new Map([['key', rawUndefined]]));
        });
      });

      test(Serialize.Type.Null.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Null })).toBe(rawNull);
      });

      describe(Serialize.Type.Number.toString(), () => {
        test('GIVEN number THEN returns number', () => {
          expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber })).toBe(
            rawNumber
          );
        });

        test('GIVEN NaN THEN returns NaN', () => {
          expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' })).toBe(NaN);
        });

        test('GIVEN Infinity THEN returns Infinity', () => {
          expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' })).toBe(
            Infinity
          );
        });

        test('GIVEN -Infinity THEN returns -Infinity', () => {
          expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' })).toBe(
            -Infinity
          );
        });
      });

      describe(Serialize.Type.Object.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt } }
            })
          ).toStrictEqual({
            key: rawBigInt
          });
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean } }
            })
          ).toStrictEqual({
            key: rawBoolean
          });
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate } }
            })
          ).toStrictEqual({
            key: rawDate
          });
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Null } }
            })
          ).toStrictEqual({
            key: rawNull
          });
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Object,
                [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber } }
              })
            ).toStrictEqual({
              key: rawNumber
            });
          });

          test('GIVEN NaN THEN returns NaN', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Object,
                [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' } }
              })
            ).toStrictEqual({
              key: NaN
            });
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Object,
                [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' } }
              })
            ).toStrictEqual({
              key: Infinity
            });
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Object,
                [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' } }
              })
            ).toStrictEqual({
              key: -Infinity
            });
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp } }
            })
          ).toStrictEqual({
            key: rawRegExp
          });
        });

        test(Serialize.Type.String.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString } }
            })
          ).toStrictEqual({
            key: rawString
          });
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Object,
              [Serialize.Keying.Value]: { key: { [Serialize.Keying.Type]: Serialize.Type.Undefined } }
            })
          ).toStrictEqual({
            key: rawUndefined
          });
        });
      });

      test(Serialize.Type.RegExp.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp })).toStrictEqual(
          rawRegExp
        );
      });

      describe(Serialize.Type.Set.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.BigInt, [Serialize.Keying.Value]: jsonBigInt }]
            })
          ).toStrictEqual(new Set([rawBigInt]));
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Boolean, [Serialize.Keying.Value]: jsonBoolean }]
            })
          ).toStrictEqual(new Set([rawBoolean]));
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Date, [Serialize.Keying.Value]: jsonDate }]
            })
          ).toStrictEqual(new Set([rawDate]));
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Null }]
            })
          ).toStrictEqual(new Set([rawNull]));
        });

        describe(Serialize.Type.Number.toString(), () => {
          test('GIVEN number THEN returns number', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Set,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: jsonNumber }]
              })
            ).toStrictEqual(new Set([rawNumber]));
          });

          test('GIVEN NaN THEN returns NaN', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Set,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'NaN' }]
              })
            ).toStrictEqual(new Set([NaN]));
          });

          test('GIVEN Infinity THEN returns Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Set,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: 'Infinity' }]
              })
            ).toStrictEqual(new Set([Infinity]));
          });

          test('GIVEN -Infinity THEN returns -Infinity', () => {
            expect(
              Serialize.fromJsonCompatible({
                [Serialize.Keying.Type]: Serialize.Type.Set,
                [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Number, [Serialize.Keying.Value]: '-Infinity' }]
              })
            ).toStrictEqual(new Set([-Infinity]));
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.RegExp, [Serialize.Keying.Value]: jsonRegExp }]
            })
          ).toStrictEqual(new Set([rawRegExp]));
        });

        test(Serialize.Type.String.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString }]
            })
          ).toStrictEqual(new Set([rawString]));
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(
            Serialize.fromJsonCompatible({
              [Serialize.Keying.Type]: Serialize.Type.Set,
              [Serialize.Keying.Value]: [{ [Serialize.Keying.Type]: Serialize.Type.Undefined }]
            })
          ).toStrictEqual(new Set([rawUndefined]));
        });
      });

      test(Serialize.Type.String.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.String, [Serialize.Keying.Value]: jsonString })).toBe(
          rawString
        );
      });

      test(Serialize.Type.Undefined.toString(), () => {
        expect(Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: Serialize.Type.Undefined })).toBe(rawUndefined);
      });
    });

    test('GIVEN unknown type THEN throws error', () => {
      // @ts-expect-error 2322 - Type 'function' is not assignable to type 'Serialize.Type'.
      expect(() => Serialize.fromJsonCompatible({ [Serialize.Keying.Type]: 'function' })).toThrowError(
        'Serialize.fromJsonCompatible() received an unknown type while parsing: "undefined" (function).'
      );
    });
  });
});
