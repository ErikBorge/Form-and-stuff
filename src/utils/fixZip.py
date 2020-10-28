import pandas as pd

df = pd.read_csv('./postnr.csv', usecols=['Postnummer', 'Poststed'], sep=';', converters={'Postnummer': lambda x: str(x)})

print('Reading csv and formatting zip codes into javascript object')

file = open('./postnummer.js', 'w')
file.write('export const postnr = {\n')

# print(df.head())
for index, Postnummer, Poststed in df.itertuples():
    # print(f'{index} {Postnummer} {Poststed}')
    file.write(f'\t"{Postnummer}": "{Poststed}",\n')

file.write('}')
file.close()

print('done.')
