# SDOB Project Website

Project page for **Sampling-Based Disturbance Observer: Compensation of Sim-to-Real Mismatch from Traditional Models to World Models**.

- Website: https://sampling-based-dob.github.io/
- Website repository: https://github.com/sampling-based-dob/sampling-based-dob.github.io
- Research code: https://github.com/sampling-based-dob/sampling-based-dob

Content follows the current `2026_sdob/submit_v1.tex` manuscript, including its three contributions, five simulation studies, and three real-robot demonstrations. The paper download is `static/papers/sdob-paper.pdf`.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

The site is intentionally build-free and can be served directly by GitHub Pages from the repository root.

## GitHub Pages

Use the `sampling-based-dob/sampling-based-dob.github.io` repository. In **Settings → Pages**, select the branch containing this site and the **/ (root)** folder. The `.nojekyll` file keeps these static assets served directly.

The Code buttons link to the research repository named in the manuscript. The footer links to this website's source repository.

## Media

Rocket Collect and Visual Landing use the comparison videos `rocket_collect_comparison.mp4` and `landing_comparison.mp4` from `2026_sdob/figure/exp/`, served from `static/videos/` with their result figures as posters.

Overview, control-flow, and experiment figures are exported from the current manuscript assets. Existing demonstration videos retain their original filenames and may show the earlier MDOB name; the project video section explains the naming change. The PointWorld demonstration uses initial feedback calibration followed by a single plan, with no replanning during execution.
