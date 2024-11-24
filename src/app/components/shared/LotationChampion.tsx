import { fetchLotationChampion } from '@/apiFunction'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
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
      <Text size="t3" weight="bold" display="block">
        로테이션 챔피언
      </Text>
      <Flex
        justify="center"
        className="mx-auto mt-[20px] w-[full] gap-[8px] flex-wrap"
      >
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {rotationChampion?.map((item: Record<string, any>) => {
          return (
            <div key={item.name}>
              <ChampionProfile
                name={item.id}
                className="w-[60px] h-[60px] flex-wrap"
              />
            </div>
          )
        })}
      </Flex>
    </div>
  )
}
export default LotationChampion
