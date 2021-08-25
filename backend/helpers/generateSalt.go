package helpers

import "math/rand"

func GenerateSalt(size int) []byte {
	salt := make([]byte, size)
	rand.Read(salt)
	return salt
}