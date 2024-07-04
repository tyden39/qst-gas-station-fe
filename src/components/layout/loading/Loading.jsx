import useGlobalLoading from "zustands/useGlobalLoading"
import "./loading.css"

export default function Loading() {
  const loading = useGlobalLoading((state) => state.globalLoading)

  return loading ? (
    <div className="absolute inset-0 z-50 flex justify-center items-center bg-[hsl(208,100%,18%,0.4)]">
      <div class="lds-dual-ring"></div>
    </div>
  ) : null
}
