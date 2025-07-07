import bcrypt from "bcrypt";

export async function hash(value) {
    const hashed = await bcrypt.hash(value, 10);

    return hashed;
}

export async function compare(data, hashed) {
    const valid = await bcrypt.compare(data, hashed);

    return valid;
}