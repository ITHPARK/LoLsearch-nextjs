import { fetchLotationChampion } from '@/apiFunction'
import Flex from '@/app/components/shared/Flex'
import ChampionProfile from '@/app/components/shared/ChampionProfile'

const LotationChampion = async () => {
  // 3초 동안 렌더링 지연
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const rotationChampion = (await fetchLotationChampion())?.flat() as Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >[]

  return (
    <div>
      <Flex className="mx-auto mt-[20px] w-[full] gap-[8px] flex-wrap">
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {rotationChampion?.map((item: Record<string, any>) => {
          return (
            <div key={item.name}>
              <ChampionProfile
                name={item.id}
                className="w-[55px] h-[55px] flex-wrap"
              />
            </div>
          )
        })}
      </Flex>
    </div>
  )
}
export default LotationChampion
