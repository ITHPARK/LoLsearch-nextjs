'use client'
import React from 'react'
import { store } from '@/remote/firebase'
import { doc, getDoc } from 'firebase/firestore'

const Test = () => {
  async function checkConnection() {
    try {
      const testDocRef = doc(store, 'your-collection-name', 'test-document-id')
      const testDoc = await getDoc(testDocRef)

      if (testDoc.exists()) {
        console.log('Firestore와 연결되었습니다:', testDoc.data())
      } else {
        console.log('Firestore에 연결되었지만, 문서가 없습니다.')
      }
    } catch (error) {
      console.error('Firestore 연결 오류:', error)
    }
  }

  checkConnection()

  const uploadJson = async () => {
    const fileInput = document.getElementById('jsonFile') as HTMLInputElement
    const file = fileInput?.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string) // JSON 파일 파싱

          // profileIcons 객체의 각 아이콘에 대해 Firestore에 추가
          for (const item in jsonData) {
            if (jsonData.hasOwnProperty(item)) {
              // profileIcons의 속성 검사
              const runeData = jsonData[item] // 아이콘 데이터 가져오기
              console.log(runeData)
              // try {
              //   // Firestore의 `profileIcons` 컬렉션에 각 아이콘을 문서로 추가
              //   await setDoc(doc(store, 'summonerRunes', item), runeData)
              //   console.log(`Added icon with ID: ${item}`)
              // } catch (error) {
              //   console.error(`Error adding icon with ID: ${item}`, error)
              // }
            }
          }
        } catch (error) {
          console.error('Error parsing JSON file', error)
        }
      }

      reader.readAsText(file) // 파일 읽기 시작
    }
  }

  return (
    <div>
      <input type="file" id="jsonFile" />
      <button onClick={uploadJson}>Upload JSON</button>{' '}
    </div>
  )
}

export default Test
