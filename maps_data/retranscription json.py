for fileNo in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '17', '19']:
    print("Processing file number " + fileNo)

    f = open("eurovelo" + fileNo + ".json", "r")
    f.read(2)
    f.read(8) # latitude
    f.read(3)
    lat = []
    long = []
    while True:
        if f.read(1) == '}':
            break
        while f.read(1) != ':':
            continue
        i = f.read(1)
        s = ""
        while i != ',':
            if i == '}':
                # s+=i
                lat.append(s)
                break
            s += i
            i = f.read(1)
        if i == '}':
            # s+=i
            # lat.append(s)
            break
        lat.append(s)
    f.read(2)
    f.read(9) # longitude
    f.read(3) # ":{
    while True:
        if f.read(1) == '}':
            break
        while f.read(1) != ':':
            continue
        i = f.read(1)
        s = ""
        while i != ',':
            if i == '}':
                # s+=i
                long.append(s)
                break
            s += i
            i = f.read(1)
        if i == '}':
            # s+=i
            # lat.append(s)
            break
        long.append(s)
    f.close()

    with open("eurovelo" + fileNo + ".js", "w") as w:
        w.write("export default function getRoad" + fileNo + "() { return [\n")
        for i in range(len(lat) - 1):
            w.write("    {latitude:" + lat[i] + ", longitude:" + long[i] + "},\n")
        w.write("    {latitude:" + lat[-1] + ", longitude:" + long[-1] + "}]\n")
        w.write("    }")